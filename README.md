To run clone this repo

Create a account on https://auth0.com

Go to Create application
![image](https://github.com/OAllanFernando/electron-auth0-authentication/assets/86169747/7b8c9959-d7d8-4e19-92c2-bd287c8a201d)
 
Insert a name and Choose Native as the application type

Search for the Allowed Callback URLs field and put the following URL as its value: http://localhost/callback

Fine, its almost there

now in your project change the data on env-variables.json, you can get this codes on your new application 

>> npm install

>> npm start 

Now you can acess using the oauth and OpenId to recover the user identity

Of course improvements are welcome, please pr
