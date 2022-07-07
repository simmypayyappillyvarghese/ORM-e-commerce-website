const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
  const tagData=await Tag.findAll({
    include:[{model:Product,through:ProductTag,as:'tagged_product'}]
  });
  if(!tagData){
    return res.status(404).json({message:"No data found"});
  }
  return res.status(200).json(tagData);
}
catch(e){console.log(e)}

});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData=await Tag.findByPk(req.params.id,{
      include:[{model:Product,through:ProductTag,as:'tagged_product'}]
    });
    if(!tagData){
      return res.status(404).json({message:"No data found"});
    }
    return res.status(200).json(tagData);
  }
  catch(e){console.log(e)}


});

router.post('/', async(req, res) => {
  // create a new tag
try{
  const tagData=await Tag.create(req.body);
  if(!tagData){
    return res.status(404).json({message:"Failed to create the data"});
  }
  return res.status(200).json(tagData);
}
catch(e){
  console.log(e);
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData=await Tag.update({tag_name:req.body.tag_name},{

      where:{id:req.params.id}
    });
    if(tagData==0){
      return res.status(404).json({message:"No data found to update"});
    }
    return res.status(200).json(tagData);
  }
  catch(e){
    console.log(e);
  }
  
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData=await Tag.destroy({

      where:{id:req.params.id}
    });
    if(tagData==0){
      return res.status(404).json({message:"No data found to delete"});
    }
    return res.status(200).json(tagData);
  }
  catch(e){
    console.log(e);
  }

});

module.exports = router;
