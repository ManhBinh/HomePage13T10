import { StyleSheet, Text, View } from "react-native";
import MainButton from "../components/MainButton";
import MainLogo from "../components/MainLogo";
import MainInput from "../components/MainInput";
//import React, { useState } from "react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup  ({ navigation }) {
  const [name, setName] = useState("Manh");
  const [phone, setPhone] = useState("0362");
  const [email, setEmail] = useState("manh@gmail.com");
  const [password, setPassword] = useState("123");

  function onSignUp() {
    if (name.trim() == "" || !name) {
      alert("Không được để trống họ và tên !");
    } else if (phone.trim() == "" || !phone) {
      alert("Không được để trống phone !");
    } else if (email.trim() == "" || !email) {
      alert("Không được để trống email !");
    } else if (password.trim() == "" || !password) {
      alert("Không được để trống mật khẩu !");
    } else {
      createAccount();
    }
  }
  const createAccount = async () => {
    let userData = await AsyncStorage.getItem("userData");
    if (userData) {
      userData = JSON.parse(userData);
      let arr = [...userData];
      arr = arr.filter(
        (value) => value.email.toLocaleLowerCase() == email.toLocaleLowerCase()
      );
      if (arr.length > 0) {
        alert("Email đã đăng kí!");
        return;
      } else {
        userData.push({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          password: password.trim(),
        });
      }
    } else {
      userData = [];
      userData.push({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password: password.trim(),
      });
    }
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    alert("Đăng ký thành công!");
    navigation.goBack();
  };

  return (
    <View style={{ marginTop: 70 }}>
      <MainLogo title="Create new account" />

      <MainInput placeholder="Full Name" value={name} onchangeText={setName} />
      <MainInput
        placeholder="Phone Number"
        value={phone}
        onchangeText={setPhone}
      />
      <MainInput
        placeholder="E-mail Adress"
        value={email}
        onchangeText={setEmail}
      />
      <MainInput
        placeholder="Password"
        value={password}
        onchangeText={setPassword}
      />

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MainButton
          backgroundColor={{ backgroundColor: "#3b5998" }}
          title="Sign Up"
          onPress={onSignUp}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#cccccc",
    alignItems: "center",
    justifyContent: "center",
  },
});
