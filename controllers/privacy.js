module.exports.terms=(req,res)=>{
  // let date=new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' });
  const date = '28 Aug 2025';

  res.render("footer/terms",{date});
}
module.exports.privacy=(req,res)=>{
  const date = '28 Aug 2025';
  // let date=new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' });
  res.render("footer/privacy.ejs",{date})
}