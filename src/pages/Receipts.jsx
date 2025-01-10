import { useEffect } from "react"
import { useState } from "react"
import { Fetch } from "../services/Fetch";
import { useGlobalContext } from "../context/GlobalContext";
import { PageComponent } from "../components/pages/productsPage/PageComponent";
import noReceiptsImg from "../assets/images/receipt.png"
import { ShowOneReceipt } from "../components/pages/receiptsPage/ShowOneReceipt";
import { TabelReceiptsList } from "../components/pages/receiptsPage/TabelReceiptsList";
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






  return (
    <article className="receiptsContainer">
      <section className="receiptsContent">
        <h1> {receipt ? "Receipt" : "Receipts"}</h1>

        {receipt ?
          /* show singel receipt */
          <ShowOneReceipt receipt={receipt} setReceipt={setReceipt} />
          :

          <section className="receiptsContent___receiptsList">
            {receipts.length >= 1 ?
              /* show tabel - receipt list */
              <TabelReceiptsList receipts={receipts} setReceipt={setReceipt} />

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
            {/* page component => button to change page  */}
            <PageComponent page={page} setPage={setPage} totalPages={totalPages} />
          </section>
        }
      </section>

      {/* page background image */}
      <img src="https://i.ibb.co/sRxRDnJ/Product1.png" alt="background" className='receiptsContainer___backgroundImg' />

    </article>
  )
}
