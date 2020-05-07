export const formatNumber = (num) => {
  if(num) {
    const splitNum = num.toString().split('.')
    return splitNum[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').concat("." + splitNum[1])
  }
}
