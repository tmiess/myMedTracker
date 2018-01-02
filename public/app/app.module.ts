import { AngularFireModule } from 'angularfire2';

//export the config

export const patConfig = {
            apiKey: "AIzaSyA_O9wyyn23uCxJs2MT8UgG3S3yEs4JSmU",
            authDomain: "patient-login.firebaseapp.com",
            databaseURL: "https://patient-login.firebaseio.com",
            projectId: "patient-login",
            storageBucket: "patient-login.appspot.com",
            messagingSenderId: "8215542957"
        };
        
        
        const docConfig = {
            apiKey: "AIzaSyDAjzmDGWyJyGxQRtzCkntvgQkyuG-7xeA",
            authDomain: "doctor-login-b6832.firebaseapp.com",
            databaseURL: "https://doctor-login-b6832.firebaseio.com",
            projectId: "doctor-login-b6832",
            storageBucket: "doctor-login-b6832.appspot.com",
            messagingSenderId: "819442752065"
        };
        
@NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            AngularFireModule.initializeApp(firebaseConfig)
        ],
})
