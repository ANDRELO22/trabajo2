  import React, { useState } from "react";
  import 'bootstrap/dist/css/bootstrap.css';
  import './App.css';

  const FieldInput = ({ indexParent, placeholder, name, value, onChange }) => (
    <div className="w-full  mx-2">
      <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
        <input
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(event) => onChange(indexParent, event)}
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
        />
      </div>
    </div>
  );

  const App = () => {
    const defaultFields = {
      nombre: "",
      email: "",
      telefono: "",
      area: "",
    };


    const [data, setData] = useState([defaultFields]);
    const [errors, setErrors] = useState([]);

    //validacion 


    // Utilizamos el index del grupo de campos para eliminar ese grupo de la lista
    const onDelete = (indexToDelete) => {
      const newFields = data.filter((d, index) => index !== indexToDelete);
      setData([...newFields]);
    };

    // Agregamos el nuevo grupo de campos al final de la lista
    const onAdd = () => {
      setData([...data, { ...defaultFields }]);
    };

    // Utilizamos el index del grupo de campos para buscar ese grupo
    // y editar el campo correspondiente
    const onChange = (indexParent, event) => {
      const newData = data.map((element, index) => {
        if (index === indexParent) {
          element[event.target.name] = event.target.value;
        }

        return element;
      });

      setData([...newData]);
    };

    //Metodo de guardar formulario
    const handleCreateForm = ( e ) => {
      e.preventDefault();

      // setSubmittedForm(true);
      let errores = [];
      let object = {};
      let invalid = false;

      data.forEach((element, index) => {
        if(element.nombre.length === 0){
          invalid = true;
          if(errores.length === 0){
              object.key = index;
              object.nombre = 'Este campo es requerido';
              errores.push(object);
          }else{
              const bugElements = JSON.parse(JSON.stringify(errores));
              bugElements[index] = {
                  ...bugElements[index],
                  key: index,
                  nombre: 'Este campo es requerido'
              };
              errores = bugElements;
          }
      }else{
          const bugElements = JSON.parse(JSON.stringify(errores));
          bugElements[index] = {
              ...bugElements[index],
              key: index,
              nombre: ''
          };
          errores = bugElements;
      }
      });
      object = {};
      console.log(errores);
    }

    return (
      <div className="App">
        <div className="flex flex-col md:flex-row pb-4 mb-4">
          <div className="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">
            Datos de contacto
          </div>
        <div>
              
      </div>
          <form onSubmit={ handleCreateForm }>
                <div className="border-b border-gray-200">
                  <div className="flex flex-col md:flex-row">
                    {data.map((d, index) => {
                      return (
                        <div key={`field-${index}`}>
                          <h3>Formulario{ index + 1 }</h3>
                            <FieldInput
                              indexParent={index}
                              placeholder="Nombre del contacto"
                              name="nombre"
                              value={d.nombre}
                              onChange={onChange}
                            />
                            <FieldInput
                              indexParent={index}
                              placeholder="Email"
                              name="email"
                              value={d.email}
                              onChange={onChange}
                              

                            />
                            <FieldInput
                              indexParent={index}
                              placeholder="Teléfono"
                              name="telefono"
                              value={d.telefono}
                              onChange={onChange}
                            />
                            <FieldInput
                              indexParent={index}
                              placeholder="Área o Sector"
                              name="area"
                              value={d.area}
                              onChange={onChange}
                            />
                          

                            <div className="w-full mx-2 flex items-center justify-center">
                                {/* <button
                                  onClick={onAdd}
                                  type="button"
                                  className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-5 rounded focus:outline-none focus:shadow-outline"
                                >
                                  guardar
                                </button> */}
                              <button
                                onClick={() => onDelete(index)}
                                type="button"
                                className="btn btn-danger"
                              >
                                Eliminar
                              </button>
                            
                            </div>
                          
                        </div>
                      );
                    })}
                    <button
                            onClick={onAdd}
                            type="button"
                            className="btn btn-info"
                          >
                            + Agregar formulario
                    </button>
                  </div>
                </div>
                <button variant="primary" className="btn btn-success mt-3" type="submit">
                            Guardar
                </button>
          </form>
        </div>
      </div>
    );
  };

  export default App;
