import { useEffect } from "react"
import { useState } from "react"
import { Fetch } from "../services/Fetch";
import { useGlobalContext } from "../context/GlobalContext";
import { PageComponent } from "../components/Products/PageComponent";
import noReceiptsImg from "../assets/images/receipt.png"
export const Receipts = () => {
  const { userId } = useGlobalContext()
  const [receipts, setReceipts] = useState([])
  const [url, setUrl] = useState("getReceipts")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFirstRender, setisFirstRender] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const { data } = Fetch(url, "POST", { userId })



  useEffect(() => {
  
    if (data) {
      setReceipts(data.receiptsList)
      setTotalPages(data.totalPages)
      setUrl('')
      setisFirstRender(true)
    }
  }, [data])

  useEffect(() => {
    setUrl(`getReceipts?page=${page}`)
  }, [page])

  console.log(receipt)

  return (
    <article className="receiptsContainer">

      <section className="receiptsContent">


        <h1> {receipt ? "Receipt" : "Receipts"}</h1>






        {receipt ?

          <section className="receiptsContent___receipt">


            <div className="orderDetails">
              <section className="orderDetails__btnContainer">

                <button onClick={() => setReceipt(null)}>  <i className="bi bi-x-lg"></i>
                </button>
              </section>

              <h2 className="orderDetails__title">Order Information</h2>
              <p className="orderDetails__info">
                <strong>Receipt ID:</strong> #{receipt._id.slice(17, -1)}
              </p>
              <p className="orderDetails__info">
                <strong>Order Created At:</strong> {new Date(receipt.createdAt).toLocaleString().slice(0, -3)}
              </p>

              <h3 className="orderDetails__productsTitle">Products:</h3>
              <ul className="orderDetails__productsList">
                {receipt.products.map((product, index) => (
                  <li className="orderDetails__product" key={index}>
                    <section>   {product.name}      </section>

                    <section>      {product.price} kr  x  {product.quantity}</section>
                    <section>  {product.price * product.quantity} kr </section>
                  </li>
                ))}
              </ul>

              <p className="orderDetails__discount">
                <strong>Discount:</strong> {receipt.discount}kr
              </p>
              <p className="orderDetails__totalPrice">
                <strong>Total:</strong> {receipt.totalPrice}kr
              </p>
            </div>


          </section>



          :

          <section className="receiptsContent___receiptsList">


            {receipts.length >= 1 ?

              <table >
                <thead>
                  <tr>
                    <th>Created</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Discount</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts && receipts.map((receipt, index) => (
                    <tr key={index} onClick={() => setReceipt(receipt)} >
                      {/* Skapad Tid */}
                      <td>{new Date(receipt.createdAt).toLocaleString().slice(0, -8)}</td>

                      {/* Antal Produkter */}
                 <td>{receipt.products.reduce((total, product) => total + product.quantity, 0)}</td>


                      {/* Totalpris */}
                      <td>{receipt.totalPrice}</td>

                      {/* Rabatt */}
                      <td>{receipt.discount}</td>

                      {/* Förkortat Produkt-ID */}
                      <td>
                        {receipt.products.length > 0 && `#${receipt._id.slice(17, -1)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              : <section className="receiptsContent___receiptsList___noReceipts">
                {isFirstRender && <div>
                  <h2> No Receipts </h2>

                  <img src={noReceiptsImg} alt="no receipt" />
                </div>}

              </section>
            }





          </section>

        }

        {receipts.length >= 1 && !receipt &&
          <section className="productsContent___pageContainer">
            <PageComponent page={page} setPage={setPage} totalPages={totalPages} />
          </section>
        }
      </section>

      <img src="https://i.ibb.co/sRxRDnJ/Product1.png" alt="background" className='receiptsContainer___backgroundImg' />


    </article>
  )
}
