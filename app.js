// include libraries
var express = require('express'),
	app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');
	path = require('path');
	
	
// Load index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

// Define public folder
app.use(express.static(path.join(__dirname, 'public')));


/*
 * Personal variables
 */
var alphabetChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,;:!'(-)?";
var decryptedText = "";
var decryptedTextClassic = "";
var decryptedTextNumber = "";
var encryptedText = "";
var offset = 7;
var pathFileOrigon = "./original.txt";
var pathFileCrypted = "./CesarAndNumber.txt"; 
var pathFileCesarClassic = "./";
var pathFileCesarNumber = "./";

	// crypt_cesar_classic(pathFileOrigon);
	/*
	 * CRYPTAGE CESAR CLASSIC
	 */
	function crypt_cesar_classic(fileOriginPath) 
	{
	  
		// File to encrypt
		fs.readFile(fileOriginPath, 'utf8', function (err,data) {
		  if (err) {
			  return console.log(err);
		  }
		  	  
		  // Change lowercase to uppercase into the text
		  var dataUppercase = data.toUpperCase();
	
		  
		  // for each char
		  for (var int = 0; int < dataUppercase.length; int++) {
			  var current_char = dataUppercase[int];
			  var newIndex = alphabetChar.indexOf(current_char) + offset;
			  
			  if(current_char != " " && current_char != "")
			  {
				  if(newIndex > alphabetChar.length)
				  {
					  encryptedText = encryptedText + alphabetChar[newIndex - (alphabetChar.length - 1)];
				  }
				  else {
					  encryptedText = encryptedText + alphabetChar[newIndex] + "\\";
				  }
			  }
			  else {
				  if(current_char != "")
				  {
					  encryptedText = encryptedText + current_char + "\\";
				  }
			  }  
		  }
		  
		  
		  // Write result encryption into a file 
		  fs.writeFile('./CesarClassic.txt', encryptedText.toString(), function (err,data) {
			  if (err) {
			    return console.log(err);
			  }
			  
		  });
		  
		// End callback ReadFile Original
		});
	}  


	// crypt_cesar_number(pathFileOrigon);
	/*
	 * CRYPTAGE CESAR NUMBER
	 */
	function crypt_cesar_number(fileOriginPath) 
	{
	  
		// File to encrypt
		fs.readFile(fileOriginPath, 'utf8', function (err,data) {
		  if (err) {
			  return console.log(err);
		  }
		  	  
		  // Change lowercase to uppercase into the text
		  var dataUppercase = data.toUpperCase();
	
		 
		  for (var int = 0; int < dataUppercase.length; int++) {
			var current_char = dataUppercase[int];
			
			var newIndex = alphabetChar.indexOf(current_char) + offset;

			  if(current_char != " " && current_char != "")
			  {
				  if(newIndex > alphabetChar.length)
				  {
					  encryptedText = encryptedText + (newIndex - (alphabetChar.length - 1)).toString() + "\\";
				  }
				  else {
					  encryptedText = encryptedText + newIndex.toString() + "\\";
				  }
			  }
			  else {
				  if(current_char != "")
				  {
					  encryptedText = encryptedText + current_char + "\\";
				  }
			  }  
			  
		  }
		  
		  // Write result encryption into a file 
		  fs.writeFile('./CesarNumber.txt', encryptedText.toString(), function (err,data) {
			  if (err) {
			    return console.log(err);
			  }

		  });
		  
		// End callback ReadFile Original
		});
	}
	
	//decrypt_cesar_classic(pathFileOrigon, true);
	/*
	 * DECRYPTAGE CESAR CLASSIC
	 */	
	function decrypt_cesar_classic(fileCryptedPath, isFile) 
	{
		if(isFile)
		{
			fs.readFile(fileCryptedPath, 'utf8', function (err,data) {
				  if (err) {
					  return console.log(err);
				  }
				  // Call algo cesar for a file
				  algo_decrypt_cesar_classic(data);
			});
		}
		else {
			// Call algo cesar for a text, with a callback
			algo_decrypt_cesar_classic(fileCryptedPath, callbackAlgoClassic);
		}
		
	} 
	
	
	function algo_decrypt_cesar_classic(flux, cb)
	{
		var splitCrypted = flux.split("\\");
		decryptedTextClassic = "";
		  // DECRYPTAGE CESAR
		  for (var int = 0; int < splitCrypted.length; int++) 
		  {
			  var array_element = splitCrypted[int];
	
			  if(array_element != " " && array_element != "")
			  {
				  var indexChar = alphabetChar.indexOf(array_element);
	
				  if(indexChar - offset < 0)
				  {
					  var newIndex = (alphabetChar.length - 1) - (offset - indexChar);
					  decryptedTextClassic = decryptedTextClassic + alphabetChar[newIndex];
					  
					  
				  }
				  else {
					  decryptedTextClassic = decryptedTextClassic + alphabetChar[indexChar - offset];
				  }
				  
			  }
			  else {
				  if(array_element != "")
				  {
					  decryptedTextClassic = decryptedTextClassic + array_element;
				  }
			  }  
		  }
		  
		  // Callback
		  if(cb !== false)
		  {
			// wait 2s for simulation
			setTimeout(function() {
				cb(decryptedTextClassic);
			}, 2000);
			
		  }
	}

	//decrypt_cesar_number(pathFileCrypted);
	/*
	 * DECRYPTAGE CESAR NUMBER
	 */
	function decrypt_cesar_number(fileCryptedPath, isFile) 
	{
		if(isFile)
		{
			fs.readFile(fileCryptedPath, 'utf8', function (err,data) {
				  if (err) {
					  return console.log(err);
				  }
				  
				  algo_decrypt_cesar_number(data);
			});
		}
		else {
			algo_decrypt_cesar_number(fileCryptedPath, callbackAlgoNumber);			
		}
		 
	} 
	
	
	function algo_decrypt_cesar_number(data, cb)
	{
		
		var splitCrypted = data.split("\\");
		decryptedTextNumber = ""; 
		  // DECRYPTAGE CESAR NUMBER
		  for (var int = 0; int < splitCrypted.length; int++) 
		  {
			  var array_element = splitCrypted[int];
			  
			  if(array_element != " " && array_element != "")
			  {
				  var indexChar = alphabetChar.indexOf(alphabetChar[array_element]);
				  
				  if(indexChar - offset < 0)
				  {
					  var newIndex = (alphabetChar.length - 1) - (offset - indexChar);
					  decryptedTextNumber = decryptedTextNumber + alphabetChar[newIndex];
					  
				  }
				  else {
					  decryptedTextNumber = decryptedTextNumber + alphabetChar[indexChar - offset];
				  }
				  
			  }
			  else {
				  if(array_element != "")
				  {
					  decryptedTextNumber = decryptedTextNumber + array_element;
				  }
				  
			  }
			  
		  }
		  
		  // Callback
		  if(cb !== false)
		  {
			cb(decryptedTextNumber);
		  }
	}
	

// Callback variables
var callbackAlgoClassic;
var callbackAlgoNumber;

// Start io connection
io.sockets.on('connection', function (socket) {
    // Launch decrypt on "start_decrypt" event
    socket.on('start_decrypt', function (decrypted) {
		decrypt_cesar_classic(decrypted, false);
        decrypt_cesar_number(decrypted, false);      
    }); 
	
	// Callbacks initialization
	callbackAlgoClassic = function(decrpytClassic) {
		// Send event "classic_end"
		socket.emit('classic_end', {messageClassic: decrpytClassic});
	};
	
	callbackAlgoNumber = function(decrpytNumber) {
		// Send event "number_end"
		socket.emit('number_end', {messageNumber: decrpytNumber});
	};
});

server.listen(8080);