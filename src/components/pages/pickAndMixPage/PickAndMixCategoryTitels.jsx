const PickAndMixCategoryTitels = ({ titel, background }) => {
  return (
    <section className="pickAndMix___pickAndMixTitels">
      {/* Render background image for the category */}
      <img src={background} alt="backgroun" />

      {/* Display the category title */}
      <h2>{titel}</h2>
    </section>
  )
}

export default PickAndMixCategoryTitels