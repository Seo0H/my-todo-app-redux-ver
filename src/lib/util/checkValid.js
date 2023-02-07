import { useRef } from "react";
import { useState } from "react";

/**
 * @param {String} name = {email or password}
 * @param {String} value = {user Input}
 * @returns {boolean} valid : 유효성 검증 여부
 * @returns {boolean} message : 유효성 검증 여부에 따른 메세지)
 *
 *
 */
const ChekcValid = (value, name ) =>  {
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");

  const emailFn = new useRef("@");
  const passwordFn = new useRef("(?=(w|d){8,})"); // 공백 제외 8자 이상

  if (value === "") {
    setValid(false);
    setMessage("빈칸을 다 채워 주세요.");
    return { valid, message };
  }

  if (name === "email") {
    if (test(value, emailFn)) setValid(true);
    else {
      setValid(false);
      setMessage("이메일에는 @가 포함되어야 합니다.");
    }
    return { valid, message };
  }

  if (name === "password") {
    if (test(value, passwordFn)) setValid(true);
    else {
      setValid(false);
      setMessage("비밀번호는 (공백 제외) 8자 이상이어야 합니다. ");
    }
    return { valid, message };
  }
}

export default ChekcValid;