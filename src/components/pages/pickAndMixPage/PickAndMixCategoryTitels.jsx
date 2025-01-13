const PickAndMixCategoryTitels = ({ titel, background }) => {
/* this creat a classname fpr h2, replace() remove blank spaces  */
const titelName = titel.replace(/\s+/g, '');

  return (
    <section className="pickAndMix___pickAndMixTitels">
      {/* Render background image for the category */}
      <img src={background} alt="backgroun" />

      {/* Display the category title */}
      <h2 className={titelName}>{titel}</h2>
    </section>
  )
}

export default PickAndMixCategoryTitels