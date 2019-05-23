function add_auth_to_params_string(params) {
    var API_KEY = "544f49d886fd734c2fecf91b2c88e2a1";
    var API_TOKEN = "e591a416e52271378bb7302fbd5e703d7bc04f39c9932f19c2431e4d437ae8db";

    return params + "&key=" + API_KEY + "&token=" + API_TOKEN;
}

function create_new_board() {
    // debugger;
    var url = "https://api.trello.com/1/boards";
    var board_name = "surviver name".split(' ').join('%20');
    var params = "name=" + board_name + "&defaultLabels=false&defaultLists=false&keepFromSource=none&prefs_permissionLevel=private&prefs_voting=disabled&prefs_comments=members&prefs_invitations=members&prefs_selfJoin=true&prefs_cardCovers=true&prefs_background=blue&prefs_cardAging=regular";
    params = add_auth_to_params_string(params);

    var response = UrlFetchApp.fetch(url, {
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        payload: params
    });
    console.log(response.getContentText());
};

function onFormSubmit() {
    create_new_board()
}
