var paramNameMap = {
  'שם': 'name',
  'כתובת': 'address',
  'טלפון': 'phone',
  'מה צריך לשפץ': 'fixList',
  'אזור בארץ': 'region'
};
var url = "https://api.trello.com/1/";
var idBoard = '5ce78e1cf5f672442a564ed0';

var descArr = [
  "שם: ",
  "טלפון: "
];

var volList = [
  "רשימת מתנדבים: ",
  "אמיר לוי",
  "יונתן מלצר",
  "נתן אבנר"
];

function createDescString(name, phone) {
  return [
    descArr[0] + name,
    descArr[1] + phone,
  ].concat(volList).join('\n');
}

function addAuthToParamsString(params) {
    var API_KEY = "5e30685c224edc15831979261b079ece";
    var API_TOKEN = "f0971aac29f272f433539a74230b28e3a8f29d632ddcab6de7de97744c05f139";
    
    return params + "&key=" + API_KEY + "&token=" + API_TOKEN;
  }

function createNewBoard(params) {
  // debugger;
  boardName = params.name.split(' ').join('%20');
  var boardParams = "name=" + boardName + "&defaultLabels=false&defaultLists=false&keepFromSource=none&prefs_permissionLevel=private&prefs_voting=disabled&prefs_comments=members&prefs_invitations=members&prefs_selfJoin=true&prefs_cardCovers=true&prefs_background=blue&prefs_cardAging=regular";
  boardParams = addAuthToParamsString(boardParams);
  
  var response = UrlFetchApp.fetch(url + 'boards', {
                    method: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    payload: boardParams
                    });
  Logger.log(response.getContentText());
  var res = JSON.parse(response.getContentText());
  return res.id;

}

function createNewTaskList(params) {
  Logger.log('params');
  Logger.log(params);
  var stringParams = ('name=' + encodeURIComponent(params.name) + '&idBoard=' + params.idBoard + '&idList=idList&keepFromSource=all').replace(/ /g, '%20');
  stringParams = addAuthToParamsString(stringParams);
  Logger.log('stringParams');
  Logger.log(stringParams);
  
  var response = UrlFetchApp.fetch(url + 'lists', {
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                payload: stringParams
                });
  
  Logger.log('response');
  Logger.log(response);

  var res = JSON.parse(response.getContentText());
  return res.id;
}

function createNewCard(params) {
  Logger.log('params');
  Logger.log(params);
  var stringParams = ('name=' + encodeURIComponent(params.name) 
    + '&desc=' + encodeURIComponent(params.desc) 
    + '&idList=' + params.idList + '&keepFromSource=all').replace(/ /g, '%20');
  stringParams = addAuthToParamsString(stringParams);
  Logger.log('stringParams');
  Logger.log(stringParams);
  
  var response = UrlFetchApp.fetch(url + 'cards', {
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                payload: stringParams
                });
  
  Logger.log('response');
  Logger.log(response);

  var res = JSON.parse(response.getContentText());
  return res.id;
}


function onFormSubmit() {
  var constructString = 'מה צריך לשפץ';
  var head_manneger = {
    name: 'Gibor',
    email: 'Gibori.shoa@gmail.com'
  }
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
  
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    var params = {};

    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      Logger.log('Response #%s to the question "%s" was "%s"',
        (i + 1).toString(),
        itemResponse.getItem().getTitle(),
        itemResponse.getResponse());

      var title = itemResponse.getItem().getTitle();
      Logger.log(title);
      Logger.log(itemResponse.getResponse());
      
      params[paramNameMap[title]] = itemResponse.getResponse();

      if (title.indexOf(constructString) > -1) {
        var shiputzCategories = itemResponse.getResponse();
        Logger.log('shiputzCategories');
        Logger.log(shiputzCategories);

        for (var k = 0; k < shiputzCategories.length; k++) {}

      }
    }

    var idList = createNewTaskList({
      name: params.name,
      idBoard: idBoard
    });

    var cardId = createNewCard({
      name: params.name,
      desc: createDescString(params.name, params.phone),
      idList: idList
    });
  }
}
