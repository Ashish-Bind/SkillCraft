const formatPrice = (price: number) => {
  const options = {
    style: 'currency',
    currency: 'INR',
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', options).format(price)

  return formattedPrice
}

export default formatPrice
