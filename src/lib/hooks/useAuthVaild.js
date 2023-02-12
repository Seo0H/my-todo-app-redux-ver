/**
 * @hook
 * `useAuthVaild`유효성 검사를 해주는 hook.
 * @param {string} name : input type ( 'email' || 'password' )
 * @param {string} val : 처리를 원하는 값
 * @returns {'null' || String} null || "some_error_message"
 */
function useAuthVaild( name, val) {

    let message;

    if(name === "email") {
        const emailExp = new RegExp("@");
        emailExp.test(val) ?
        message = null : message = "이메일에는 @를 포함해 작성해주세요."
        return message;
    }

    if(name === "password") {
        const passwordExp = new RegExp("(?=.{8,})");
        passwordExp.test(val) ?
        message = null : message = "비밀번호는 8자 이상으로 작성해주세요."
        return message;
    }
    return message = "name 이 지정되지 않았습니다.";

}

export default useAuthVaild;