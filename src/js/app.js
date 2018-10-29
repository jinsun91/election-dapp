App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  // Initialises the connection between the client side application to our local blockchain
  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      // When we login to Meta Mask, it provides us with web3Provider
      // When it does, we will set this web3 provider to our application's web3 provider
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  // Loads contract into our front-end application so that we can interact with it
  initContract: function() {
    // First we load a JSON file of our Election artifact
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      // This TruffleContract is the actual contract that we can interact with inside our app
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      return App.render();
    });
  },

  // 1. Displays the account that we're connected to the blockchain with
  // 2. List out all the candidates in our election
  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    // getCoinbase() provides us with the account that we are currently connected to blockchain with
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
