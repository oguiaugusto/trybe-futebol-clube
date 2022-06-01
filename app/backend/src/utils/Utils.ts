class Utils {
  public static checkEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
    return !!email.match(emailRegex);
  }
}

export default Utils;
