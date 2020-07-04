rules_version = '2';
service cloud.firestore {

	//match /{document=**} {
   //   allow read, write: if true;
    //}
    
    //match /petDoctor/{doctorId}{
    //	allow get, list, read, create, update : if isLogin() && uid() == resource.data.create_uid;
    //}

	match /databases/{database}/documents{
   
    match /petDoctor/{doctorId}{
        allow  list, read, create, update : if isLogin();
    }

    match /pet/{petId}{
    	allow  list, read, create, update : if isLogin();
    }
    
    match /petControl/{petControlId}{
    	allow list, read, create, update : if isLogin();
    }

    match /review/{revieId}{
        allow  list, read: if true;
        allow create, update : if isLogin();
    }

    match /comedgos/{comedogId}{
        allow  list, read: if true;
        allow create, update : if isLogin();
    }

    match /petCenters/{comedogId}{
        allow list, read: if true;
        allow create, update : if isLogin();
    }

    match /news/{newId}{
        allow  list, read: if true; 
        allow create, update : if isLogin();
    }

    match /missingPets/{missingPetId}{
        allow  list, read: if true; 
        allow create, update : if isLogin();
    }

	function isLogin(){
  	return request.auth != null;
  }
  
  function uid(){
  	return request.auth.uid;
  }
    
  }
  	
}