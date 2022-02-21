export const getCookie = (key:string) => {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  export const currencyFormat = (price: number, quantity?: number | undefined) => {
    if (quantity === undefined) {
      return "$" + (price / 100).toFixed(2);
    }
      
    return "$" + ((price * quantity) / 100).toFixed(2);
  }