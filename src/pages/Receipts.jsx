import { useEffect } from "react"
import { useState } from "react"
import { Fetch } from "../services/Fetch";
import { useGlobalContext } from "../context/GlobalContext";
import { PageComponent } from "../components/common/barLoader/PageComponent";
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
      // Store the fetched receipts and total pages
      setReceipts(data.receiptsList)
      setTotalPages(data.totalPages)
      setUrl('')  // Clear the URL 
      setisFirstRender(true)  // Stop processing after fetching
    }
  }, [data])


  // Update the URL based on the page change
  useEffect(() => {
    setUrl(`getReceipts?page=${page}`)
  }, [page])






  return (
    <article className="receiptsContainer">
      <section className="receiptsContent">


        {/* Display the title based on whether a single receipt or list is being viewed */}
        <h1> {receipt ? "Receipt" : "Receipts"}</h1>

        {receipt ?
          // Show single receipt
          <ShowOneReceipt receipt={receipt} setReceipt={setReceipt} />
          :
          // Show list of receipts in a table
          <section className="receiptsContent___receiptsList">
            {receipts.length >= 1 ?

              // If there are receipts, render them in a table
              <TabelReceiptsList receipts={receipts} setReceipt={setReceipt} />

              :
              // If no receipts are found, display a no receipts message and image
              <section className="receiptsContent___receiptsList___noReceipts">
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
            {/* Pagination Component */}
            <PageComponent page={page} setPage={setPage} totalPages={totalPages} />
          </section>
        }
      </section>

      {/* Background image */}
      <img src="https://i.ibb.co/sRxRDnJ/Product1.png" alt="background" className='receiptsContainer___backgroundImg' />

    </article>
  )
}
