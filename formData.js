function onFormSubmit() {
  var constructString = 'מה צריך לשפץ';
  var params = {};
  var head_manneger = {
    name: 'Gibor',
    email: 'Gibori.shoa@gmail.com'
  }
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();

  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();


    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      Logger.log('Response #%s to the question "%s" was "%s"',
        (i + 1).toString(),
        itemResponse.getItem().getTitle(),
        itemResponse.getResponse());

      var title = itemResponse.getItem().getTitle();
      Logger.log(title);
      Logger.log(itemResponse.getResponse());

      params[title] = itemResponse.getResponse();

      if (title.indexOf(constructString) > -1) {
        var shiputzCategories = itemResponse.getResponse();
        Logger.log('shiputzCategories');
        Logger.log(shiputzCategories);

        for (var k = 0; k < shiputzCategories.length; k++) {}

      }
    }
  }
}
