const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
  const categoryData=await Category.findAll(

    {include:[{model:Product}]}
  );

  if(!categoryData){
    return res.status(404).json({message:"No data found"})
  }
  return res.status(200).json(categoryData);
  }
  catch(e){
    console.log(e);
  }

});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
  const categoryData=await Category.findByPk(req.params.id,
    {include:[{model:Product}]}
  );

  if(!categoryData){
    return res.status(404).json({message:"No data found"});
  }
  return res.status(200).json(categoryData);

  }
  catch(e){console.log(e)}
});

router.post('/', async(req, res) => {
  // create a new category
  try{
  const categoryData=await Category.create(req.body);

  if(!categoryData){
    return res.status(404).json({message:"Failed To create the data"});
  }
  return res.status(200).json(categoryData);
}
catch(e){console.log(e)}
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData=await Category.update(req.body,{
      where:{
        id:req.params.id
      }
    });
  
    if(categoryData==0){
      return res.status(404).json({message:"No data found to update"});
    }
    return res.status(200).json(categoryData);
  }
  catch(e){console.log(e)}

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
  const categoryData=await Category.destroy({
    where:{id:req.params.id}
  });

  if(categoryData==0){
    return res.status(404).json({message:"No data found to delete"});
  }
  return res.status(200).json(categoryData);
}
catch(e){console.log(e)}
});

module.exports = router;
