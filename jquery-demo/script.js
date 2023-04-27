$(document).ready(function() {
  const $form = $('form');
  const $tableBody = $('#table-body');
  const $successDisplay = $('#success-display');
  const $closeBtn = $('#close-btn');
  $successDisplay.hide();

  $form.submit(function(e) {
    e.preventDefault();

    const name = $('#name').val();
    const geburtsdatum = $('#geburtsdatum').val();
    const hometown = $('#hometown').val();
    const hobbies = $('input[name="hobbies"]:checked').val();
    const alter = calculateAge(geburtsdatum);
///hello :)
    const newRow = `
      <tr>
        <td>${name}</td>
        <td>${geburtsdatum}</td>
        <td>${alter}</td>
        <td>${hometown}</td>
        <td>${hobbies}</td>
      </tr>
    `;

    $tableBody.append(newRow);

    $form.trigger('reset');

    $successDisplay.hide();
  });

  function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    //If the current month and day are before the birth month and day, the age is reduced by 1.
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  $('#export-btn').click(function() {
    const $rows = $tableBody.find('tr');
    const csvData = [];

    $rows.each(function() {
      const $cells = $(this).find('td');
      const rowData = [];

      $cells.each(function() {
        rowData.push($(this).text());
      });

      csvData.push(rowData.join(','));
    });

    const csvString = csvData.join('\n');

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
    link.download = 'maedchentag.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    $successDisplay.show();
  });

  $closeBtn.click(function() {
    $successDisplay.hide();
  });
});

