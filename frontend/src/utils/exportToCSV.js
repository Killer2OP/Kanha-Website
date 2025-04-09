export const exportToCSV = (data, filename) => {
  // Get headers from the first item in data
  const headers = Object.keys(data[0] || {});
  
  // Create CSV rows
  const csvRows = [
    // Header row
    headers.join(','),
    // Data rows
    ...data.map(item => 
      headers.map(header => {
        let cell = item[header];
        // Handle special cases (objects, arrays, etc.)
        if (typeof cell === 'object' && cell !== null) {
          cell = JSON.stringify(cell);
        }
        // Escape commas and quotes
        cell = cell?.toString().replace(/"/g, '""') || '';
        if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
          cell = `"${cell}"`;
        }
        return cell;
      }).join(',')
    )
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};