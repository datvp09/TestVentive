# TestVentive
Sample Navigation App, using react-navigation v1.6.1, react-redux v5.1.1 and redux-persist v5.10.0

This app runs on react native v0.60.0. Sample Navigation App's features:<br />
* Login
* Logout
* Register
* Dashboard with 4 sample tabs:
    * Home
    * Data
    * Statistic
    * Info

Setup project:
> git clone https://github.com/datvp09/TestVentive.git<br />
> cd TestVentive && npm install<br />
> react-native run-android/ios

Default profile<br />
* Username: admin<br />
* Password: admin<br />

The app use local storage namely AsyncStorage to store data. Once user login/register, user should be able navigate to plain dashboard screen with 4 sample tabs at the bottom.

