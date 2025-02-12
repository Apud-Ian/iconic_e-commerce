const FormDescription =({onChange})=>{
    return(  
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="description">Description:</label>
        <textarea id="description" className="bg-gray-50 border overflow-y-scroll max-h-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="description" onChange={onChange}></textarea>
      </div>)
}

export default FormDescription;