const MAX_PDF_BYTES = 2 * 1024 * 1024; // 2 MB hard limit

function estimateDataUrlBytes(dataUrl: string) {
	const base64 = dataUrl.split(',')[1] || '';
	return Math.ceil((base64.length * 3) / 4);
}

export async function downloadResumePdf(
	element: HTMLElement,
	fileName = 'resume.pdf'
) {
	const html2canvas = (await import('html2canvas')).default;
	const { jsPDF } = await import('jspdf');

	const attempts: Array<{ scale: number; quality: number }> = [
		{ scale: 1.75, quality: 0.82 },
		{ scale: 1.5, quality: 0.75 },
		{ scale: 1.25, quality: 0.68 },
		{ scale: 1.1, quality: 0.6 },
		{ scale: 1, quality: 0.52 },
		{ scale: 1, quality: 0.42 },
	];

	let lastError: Error | null = null;

	for (const { scale, quality } of attempts) {
		try {
			const canvas = await html2canvas(element, {
				scale,
				useCORS: true,
				backgroundColor: '#ffffff',
				logging: false,
				windowWidth: element.scrollWidth,
				windowHeight: element.scrollHeight,
			});

			const imgData = canvas.toDataURL('image/jpeg', quality);
			if (estimateDataUrlBytes(imgData) > MAX_PDF_BYTES) {
				continue;
			}

			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4',
				compress: true,
			});

			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();

			// Fit entire resume on a single A4 page (scale down if taller than page)
			let imgWidth = pageWidth;
			let imgHeight = (canvas.height * imgWidth) / canvas.width;
			if (imgHeight > pageHeight) {
				const fit = pageHeight / imgHeight;
				imgWidth *= fit;
				imgHeight = pageHeight;
			}

			const x = (pageWidth - imgWidth) / 2;
			const y = (pageHeight - imgHeight) / 2;

			pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight, undefined, 'FAST');

			const blob = pdf.output('blob') as Blob;
			if (blob.size > MAX_PDF_BYTES) {
				continue;
			}

			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			link.remove();
			URL.revokeObjectURL(url);

			return {
				bytes: blob.size,
				maxBytes: MAX_PDF_BYTES,
				pages: 1,
			};
		} catch (error) {
			lastError = error instanceof Error ? error : new Error('PDF generation failed');
		}
	}

	throw lastError || new Error('Could not generate a single-page PDF under 2 MB');
}
