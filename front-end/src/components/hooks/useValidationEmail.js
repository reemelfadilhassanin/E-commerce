function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const ValidateEmail = (email) => {
    if (validateEmail(email)) {
        return { isValid: true, error: "" };
    } else {
        return { isValid: false, error: "البريد الإلكتروني غير صالح." };
    }
}

function validatePassword(password) {
    const reg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-@]{8,16}$/;
    return reg.test(password);
}

function validateName(name) {
    const reg = /^[a-zA-Z][a-zA-Z0-9._-]{2,9}$/;
    return reg.test(name);
}

export const ValidateName = (name) => {
    if (validateName(name)) {
        return { isValid: true, error: "" };
    } else {
        return {
            isValid: false,
            error: "يجب أن يبدأ اسم المستخدم بحرف، ويمكن أن يحتوي فقط على الأحرف، الأرقام، والرموز - _ . بحد أقصى 10 أحرف.",
        };
    }
};


export const ValidatePassword = (password) => {
    if (validatePassword(password)) {
        return { isValid: true,error:'' };
    } else {
        return { 
            isValid: false, 
            error: "كلمة المرور يجب أن تحتوي على 8 إلى 16 حرفًا، ويجب أن تحتوي على حرف واحد على الأقل ورقم واحد، بالإضافة إلى بعض الرموز الخاصة مثل .، _، %، +، -، @." 
          };
              }
}
