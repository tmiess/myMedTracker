$(function() {
  $('.modal').modal();
});


var d = new Date();
d.setFullYear(d.getFullYear() - 100);
$('.datepicker').pickadate({

  today: 'Today',
  clear: 'Clear',
  close: 'Ok',
  closeOnSelect: false,
  selectMonths: true,
  selectYears: true,
  min: d,
  max: new Date(),

});
