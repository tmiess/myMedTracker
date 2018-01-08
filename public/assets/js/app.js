let ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-87d8f935-1269-44aa-ba60-2c589c2a8e09',
    subscribeKey: 'sub-c-0ed0eb28-f1eb-11e7-b8cc-0ea41350d658'
});

const getUsername = () => {
    const animals = ['zebra', 'goat', 'cow', 'pig', 'tiger', 'wolf', 'pony', 'antelope'];
    return animals[Math.floor(Math.random() * animals.length)];
};

const getColor = () => {
    const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Teal"];
    return colors[Math.floor(Math.random() * colors.length)];
};

const appendMessage = (username, text) => {

    let message =
        $(`<li class="collection-item" />`)
        .append($('<strong>').text(username + ': '))
        .append($('<span>').text(text));

    $('#log').append(message);

    $("#log").animate({ scrollTop: $('#log').prop("scrollHeight") }, "slow");

};

let me = ChatEngine.connect(getUsername(), { color: getColor() });

ChatEngine.on('$.ready', (data) => {
    console.log("app.js is connected");
    console.log(ChatEngine);

    let me = data.me;

    let chat = new ChatEngine.Chat('new-chat');

    chat.on('$.connected', (payload) => {
        appendMessage(me.uuid, 'Connected to chat!');
    });

    chat.on('$.online.here', (payload) => {
        appendMessage('Status', payload.user.uuid + ' is in the channel! Their color is ' + payload.user.state.color + '.');
    });

    chat.on('$.online.join', (payload) => {
        appendMessage('Status', payload.user.uuid + ' has come online! Their color is ' + payload.user.state.color + '.');
    });

    chat.on('message', (payload) => {
        appendMessage(payload.sender.uuid, payload.data.text);
    });


    $("#message").keypress(function(event) {

        if (event.which == 13) {
            chat.emit('message', {
                text: $("#message").val()
            });
            $("#message").val('');
            event.preventDefault();
        }
    });
});
