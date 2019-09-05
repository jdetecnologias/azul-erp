module.exports = function(){
	const copiarObjeto = function(obj){
			let novoObjeto = {}
			Object.keys(obj).forEach(key=>{
				novoObjeto[key] = obj[key]
			})
			return novoObjeto
		}
		
	const somar = function (n1 = 0,n2 = 0){
		return parseFloat(n1)+parseFloat(n2)
	}
	
	const subtrair =  function (n1 = 0,n2 = 0){
			return parseFloat(n1)-parseFloat(n2)
		}
		
	return {somar,subtrair,copiarObjeto}
}