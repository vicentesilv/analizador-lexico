import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import styled from "styled-components";
import Logotipo from "../../src/Images/LogotipoSinBgBlancoWHC.png"
import { keyframes } from 'styled-components'
import { createPortal } from "react-dom";

import { FaEye, FaEyeSlash, FaLock, FaUser, FaExclamationCircle, FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useState } from "react";
import { DiccionarioFotoPerfil } from "../../src/Images/perfil/DiccionarioPerfil";
import { DiccionarioFotoPerfilCopia } from "../../src/Images/perfilColaborador/DiccionarioPerfil";
import { HeaderGenerico } from "../Genericos/headerGenerico";


const shake = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  50% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
`;
const slideDown = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
export const ContenedorFormularioStyled = styled.div`
    width: 500px;
    max-width: 90%;
    min-height: 400px;
    
    display: grid;
    grid-template-rows: 200px auto;
    

    -webkit-box-shadow: 0px 0px 14px 3px rgba(0,0,0,0.61);
    -moz-box-shadow: 0px 0px 14px 3px rgba(0,0,0,0.61);
    box-shadow: 0px 0px 14px 3px rgba(0,0,0,0.61);
`


export const SeccionFormularioStyled = styled(Form)`
    height: 100%;
    width: 100%;
    padding: 10px;
    gap: 10px;

    display: grid;
    grid-template-rows: auto auto auto;
    background-color: white;
`;
export const SeccionImgStyled = styled.div`
    height: 100%;
    width: 100%;
    background-color: var(--colorFondo);
    background-image: url(${Logotipo});
    background-size: 80%;  
    background-position: center;  
    background-repeat: no-repeat; 
    
`

export const Titulo = styled.h1`
    color: black;
    margin: 0 ;
    text-align: center;
    font-size: 30px;
`
export const Subtitulo = styled.h2`
    color: black;
    margin-bottom: 5px ;
    text-align: center;
    font-size: 30px;
`

const ContenedorInternoField = styled.div`
    width: 100%;
    min-height: 40px;
    display: grid;
    grid-template-columns: 40px auto;
    gap: 5px;
    position: relative;
    

    font-size: var(--SizeNormal);
    padding: 5px;
    border-radius: var(--bordeRadiusGenerico);
    background-color: ${props => props.disable ? "gray" : "transparent"};
    color: ${props => props.disable ? "white" : "white"};
    
    
    border: solid 1px var(--colorPrincipal);

    > *{
      color: ${props => props.disable ? "white" : "var(--colorPrincipal)"};
        &::placeholder {
           color: ${props => props.disable ? "white" : "var(--colorPrincipal)"};
            font-size: var(--SizeNormal);
        }
    }

`;

const ContenedorInternoFieldPassword = styled(ContenedorInternoField)`
  grid-template-columns: 40px auto 40px;
`;

const FieldStyled = styled(Field)`
    border: none;
    height: 100%;
    width:100%;
    border-radius: var(--bordeRadiusGenerico);
    outline: none;
    background-color: transparent;

    &:focus {
        
    }
`;
const LabelFormStyled = styled.label`
    border: none;
    height: 100%;
    width:100%;
    border-radius: var(--bordeRadiusGenerico);
    outline: none;
    background-color: transparent;

    &:focus {
        
    }
`;
const ContenedorIconoField = styled.label`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    border-right: 1px solid var(--colorPrincipal);
    border-radius: 4px;
    cursor:pointer;
`
const ContenedorIconoFieldNoBorder = styled(ContenedorIconoField)`
    border:none;
`
export const BtnSubmit = styled.button`
    min-width: 100px;
    height: 100%;
    padding: 0 20px;
    font-size: 16px;
    border: none;
    border-radius: var(--bordeRadiusGenerico);
    background-color: var(--colorPrincipal);
    color: white;
    cursor: pointer;
    border: solid 2px var(--colorPrincipal);
    font-weight: bold;
    font-size: var(--SizeLarge);
`
export const BtnSecundario = styled.button`
    min-width: 100px;
    height: 100%;
    padding: 0 20px;
    font-size: 16px;
    border: none;
    border-radius: var(--bordeRadiusGenerico);
    background-color: white ;
    color: var(--colorPrincipal) ;
    cursor: pointer;

    font-weight: bold;
    font-size: var(--SizeLarge);
    border: solid 2px var(--colorPrincipal);
`
export const ContenedorFormBottom = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    position: relative;
`
const TxtLinkStyled = styled.div`

    user-select: none;
    font-size: var(--SizeSmall);
    cursor: pointer;
    text-decoration: underline;
    color: var(--colorPrincipal);

    position: absolute;
    ${props => props.side === "right" ? "right: 10px" : (props.side === "left" ? "left: 10px" : "0")};




` ;

const ErrorMessageStyled = styled.div`
    width: 100%;
    color:  brown;
    font-size: var(--SizeSmall);

    padding: 4px;
  
    animation: ${shake} 0.5s ease, ${slideDown} 0.3s ease-out;
    animation: ${shake} 0.5s ease, ${slideDown} 0.3s ease-out;
`;

export const TxtLink = ({ txt, onClick, side = "right" }) => {
  return (
    <TxtLinkStyled side={side} onClick={onClick}>
      {txt}
    </TxtLinkStyled>
  );
}
const ContenedorSelectField = styled.div`
position: relative;
width: 100%;
min-height: 40px;
display: grid;
grid-template-columns: 40px auto;
gap: 5px;

font-size: var(--SizeNormal);
padding: 5px;
border-radius: 10px;
background-color: ${props => props.disable ? "gray" : "transparent"};
    
color: ${props => props.disable ? "white" : "var(--colorPrincipal)"};
    border: solid 1px var(--colorPrincipal);
&> * {
  color: ${props => props.disable ? "white" : "var(--colorPrincipal)"};
  &::placeholder {
    color: ${props => props.disable ? "white" : "var(--colorPrincipal)"};
    font-size: var(--SizeNormal);
  }
}
`;

const SelectStyled = styled.select`
border: none;
height: 100%;
width: 100%;
border-radius: var(--bordeRadiusGenerico);
outline: none;
background-color: transparent;
color: ${props => props.disable ? "white" : "var(--colorPrincipal)"};
font-size: var(--SizeNormal);
&:focus {
  outline: 2px solid var(--colorPrincipal);
}
`;

const ContenedorIconoSelect = styled.label`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;

border-right: 1px solid var(--colorPrincipal);
border-radius: var(--bordeRadiusGenerico);
cursor: pointer;
`;

const OptionSelectForm = styled.option`
font-size: var(--SizeNormal); 
color: black;
`;

export const SelectForm = ({
  id = "pregunta",
  name = "pregunta",
  icon,
  options = [{ label: "", value: "" }],
  placeholder = "Selecciona una pregunta...",
  disable = false,
  onChangeCustom,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div>
      <Field name={name}>
        {({ field, form }) => {
          const activo = focus || (field.value !== "" && field.value !== undefined);

          return (
            <ContenedorSelectField disable={disable}>
              <ContenedorIconoSelect htmlFor={id}>{icon}</ContenedorIconoSelect>

              {placeholder && (
                <LabelField $activo={activo} htmlFor={id}>
                  {placeholder}
                </LabelField>
              )}

              <SelectStyled
                disable={disable}
                {...field}
                id={id}
                name={name}
                onFocus={() => setFocus(true)}
                onChange={(e) => {
                  form.handleChange(e);
                  if (onChangeCustom) onChangeCustom(e);
                }}
                onBlur={(e) => {
                  setFocus(false);
                  form.handleBlur(e);
                }}
              >
                <OptionSelectForm value="" hidden disabled>
                </OptionSelectForm>
                
                {options.map((option, index) => (
                  <OptionSelectForm key={index} value={option.value} disabled={disable}>
                    {option.label}
                  </OptionSelectForm>
                ))}
              </SelectStyled>
            </ContenedorSelectField>
          );
        }}
      </Field>

      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </div>
  );
};



export const ContenedorFields = styled.div`
     width: 100%;
    height: 100%;
    gap: 10px;
    display: flex;
    flex-direction: column;
    margin: 10px 0; 
`
export const LabelField = styled.label`
    position: absolute;
    left: ${({ $activo }) => ($activo ? "48px" : "48px")};
    top: ${({ $activo }) => ($activo ? "-8px" : "50%")};
    border-radius: 5px;
    transform: ${({ $activo }) =>
    $activo ? "none" : "translateY(-50%)"};

    font-size: ${({ $activo }) => ($activo ? "12px" : "16px")};

    background: white;
    padding: 0 4px;
    transition: .2s;

    color: ${({ $activo }) =>
    $activo ? "var(--colorPrimario)" : "var(--colorPrimario)"};

    pointer-events: none;
`;
export const FieldForm = ({ id = "email", name = "email", type = "email", placeholder = "", icon = <FaUser />, disable = false }) => {
  const [field] = useField(name);
  const [focus, setFocus] = useState(false);
  const activo = focus || field.value;
  return (
    <div>

      <ContenedorInternoField disable={disable}>
        <ContenedorIconoField htmlFor={id}>  {icon}  </ContenedorIconoField>
        {placeholder&&<LabelField $activo={activo} htmlFor={id}>
          {placeholder}
        </LabelField>}
        <FieldStyled id={id} name={name} type={type} disabled={disable} onBlur={(e) => {setFocus(false); field.onBlur(e); }}onFocus={() => setFocus(true)}/>
      </ContenedorInternoField>

      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </div>
  );
};

export const FieldForm2 = ({ id = "name", name = "name", type = "name", placeholder = "Ingresa el Nombre", icon = <FaUser />, disable = false }) => {
  return (
    <div>
      <ContenedorInternoField disable={disable}>
        <ContenedorIconoField htmlFor={id}>  {icon}  </ContenedorIconoField>
        <FieldStyled id={id} name={name} type={type} placeholder={placeholder} disabled={disable} />
      </ContenedorInternoField>

      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </div>
  );
};



const TooltipIcon = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 0.5rem;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 180px;
  background-color: #333;
  color: #fff;
  text-align: left;
  border-radius: var(--bordeRadiusGenerico);
  padding: 0.5rem;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Posición encima del icono */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
`;
const ContenedorExternoField = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
  gap: 0 10px;
  justify-content: center;
  align-items: center;
`
export const FieldFormConQuest = ({
  id = "email",
  name = "email",
  type = "email",
  placeholder = "Ingresa tu correo",
  icon = <FaUser />,
  descripcion = "Este campo es obligatorio.",
  disable = false
}) => {
  return (

    <ContenedorExternoField>

      <ContenedorInternoField disable={disable}>

        <ContenedorIconoField htmlFor={id}>
          {icon}
        </ContenedorIconoField>

        <FieldStyled
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disable}
        />
      </ContenedorInternoField>
      <TooltipIcon>
        <FaExclamationCircle color="orange" />
        <TooltipText>{descripcion}</TooltipText>
      </TooltipIcon>
      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </ContenedorExternoField>
  );
};
export const SelectFormConQuest = ({
  id = "pregunta",
  name = "pregunta",
  icon,
  descripcion = "Selecciona la opción adecuada",
  options = [{ label: "", value: "" }],
  placeholder = "Selecciona una pregunta...",
  disable = false,
  onChangeCustom,
}) => {
  return (
    <ContenedorExternoField>
      <ContenedorSelectField disable={disable}>
        <ContenedorIconoSelect htmlFor={id}>{icon}</ContenedorIconoSelect>

        <Field name={name}>
          {({ field, form }) => (
            <SelectStyled
              disable={disable}
              {...field}
              id={id}
              name={name}
              onChange={(e) => {
                form.handleChange(e);
                if (onChangeCustom) onChangeCustom(e);
              }}
              onBlur={form.handleBlur}
            >
              <OptionSelectForm value="" disabled hidden>
                {placeholder}
              </OptionSelectForm>
              {options.map((option, index) => (
                <OptionSelectForm key={index} value={option.value} disabled={disable}>
                  {option.label}
                </OptionSelectForm>
              ))}
            </SelectStyled>
          )}
        </Field>

      </ContenedorSelectField>
      <TooltipIcon>
        <FaExclamationCircle color="orange" />
        <TooltipText>{descripcion}</TooltipText>
      </TooltipIcon>
      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </ContenedorExternoField>
  );
};


export const FieldPasswordForm = ({
  id = "password",
  name = "password",
  placeholder = "Ingresa tu contraseña",
  disable = false,
  icon = <FaLock />
}) => {
  const [mostrar, setMostrar] = useState(false);

  const toggleMostrar = () => setMostrar((prev) => !prev);

  return (
    <div>
      <ContenedorInternoFieldPassword disable={disable}>
        <ContenedorIconoField htmlFor={id}>
          {icon}
        </ContenedorIconoField>

        <FieldStyled
          id={id}
          name={name}
          type={mostrar ? "text" : "password"}
          placeholder={placeholder}
          disabled={disable}
          autocomplete="current-password"
        />

        <ContenedorIconoFieldNoBorder
          style={{ right: "10px", left: "auto", cursor: "pointer" }}
          onClick={toggleMostrar}
        >
          {mostrar ? <FaEyeSlash /> : <FaEye />}
        </ContenedorIconoFieldNoBorder>
      </ContenedorInternoFieldPassword>

      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </div>
  );
};

const ContenedorInternoFieldHorizontal = styled(ContenedorInternoField)`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
`
const LabelFormHorizontal = styled.label`
   display: flex;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: var(--colorPrincipal);
    color: var(--colorFondo);
    justify-content: center;
    padding: 5px;
    font-weight: bold;
    align-items: center;
    cursor: pointer;
`
const FieldStyledHorizontal = styled(FieldStyled)`
  padding: 5px;
`
export const FieldFormHorizontal = ({ id = "email", name = "email", type = "email", placeholder = "Ingresa tu correo", label = "label", disable = false }) => {
  return (
    <div>
      <ContenedorInternoFieldHorizontal disable={disable}>
        <LabelFormHorizontal htmlFor={id} >{label}</LabelFormHorizontal>
        <FieldStyledHorizontal id={id} name={name} type={type} placeholder={placeholder} disabled={disable} />
      </ContenedorInternoFieldHorizontal>

      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </div>
  );
};

const SelectStyledHorizontal = styled.select`
  padding: 5px;
  border: none;
  width: 100%;
  outline: none;
  background-color: transparent;
  color: ${props => props.disable ? "white" : "var(--colorPrincipal)"};
  font-size: var(--SizeNormal);

  &:focus {
    outline: 2px solid var(--colorPrincipal);
  }
`;
export const SelectFormHorizontal = ({
  id = "select",
  name = "select",
  label = "Label",
  options = [{ label: "", value: "" }],
  placeholder = "Selecciona una opción...",
  disable = false,
  onChangeCustom
}) => {
  return (
    <div>
      <ContenedorInternoFieldHorizontal disable={disable}>

        <LabelFormHorizontal htmlFor={id}>
          {label}
        </LabelFormHorizontal>

        <Field name={name}>
          {({ field, form }) => (
            <SelectStyledHorizontal
              {...field}
              id={id}
              name={name}
              disable={disable}
              disabled={disable}
              onChange={(e) => {
                form.handleChange(e);
                if (onChangeCustom) onChangeCustom(e);
              }}
              onBlur={form.handleBlur}
            >
              <option value="" disabled hidden>
                {placeholder}
              </option>

              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectStyledHorizontal>
          )}
        </Field>

      </ContenedorInternoFieldHorizontal>

      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </div>
  );
};

export const LabelForm = ({ txt, icon = <FaUser /> }) => {
  return (
    <div>
      <ContenedorInternoField>
        <ContenedorIconoField >  {icon}  </ContenedorIconoField>
        <LabelFormStyled>
          {txt}
        </LabelFormStyled>
      </ContenedorInternoField>
    </div>

  );
};

export const FormularioAuthGeneric = ({ initialValues, validate, onSubmit, children }) => {
  initialValues = initialValues || { email: "" };
  validate = validate || ((values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "El correo es requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "El correo no es válido";
    }

    if (!values.password) {
      errors.password = "La contraseña es requerida";
    } else if (values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
  });
  onSubmit = onSubmit || ((values) => {

    console.log("Formulario enviado con los valores:", values);
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      <ContenedorFormularioStyled>
        <SeccionImgStyled />

        <SeccionFormularioStyled>
          {children}

        </SeccionFormularioStyled>

      </ContenedorFormularioStyled>
    </Formik>

  )
}
export const FormularioAuth = ({ initialValues, validate, onSubmit, titulo = "Iniciar Sesión" }) => {
  initialValues = initialValues || { email: "", password: "" };
  validate = validate || ((values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "El correo es requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "El correo no es válido";
    }

    if (!values.password) {
      errors.password = "La contraseña es requerida";
    } else if (values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
  });
  onSubmit = onSubmit || ((values) => {

    console.log("Formulario enviado con los valores:", values);
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      <ContenedorFormularioStyled>
        <SeccionImgStyled />

        <SeccionFormularioStyled>
          <Titulo> {titulo} </Titulo>

          <ContenedorFields>
            <FieldForm id="email" name="email" type="email" placeholder="Ingresa tu correo" icon={<FaUser />} />
            <FieldForm id="password" name="password" type="password" placeholder="Ingresa tu contraseña" icon={<FaUser />} />
            <FieldForm id="password" name="password" type="password" placeholder="Ingresa tu contraseña" icon={<FaUser />} />
            <FieldForm id="password" name="password" type="password" placeholder="Ingresa tu contraseña" icon={<FaUser />} />
          </ContenedorFields>

          <ContenedorFormBottom>
            <BtnSubmit type="submit">Enviar</BtnSubmit>
            <TxtLink txt="Iniciar Sesión" />
          </ContenedorFormBottom>

        </SeccionFormularioStyled>

      </ContenedorFormularioStyled>
    </Formik>

  )
}

const BtnSeleccionarImgStyled = styled.div`
    width: ${({ width }) => width || "100px"};
    height: ${({ height }) => height || "100px"};

    border-radius: var(--bordeRadiusGenerico);
    border: solid 1px var(--colorPrincipal);
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 50px;
    font-weight: black;

    overflow: hidden;
`

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000; /* Layer above sidebar/header overlays */
`;

const ModalContentStyled = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: var(--bordeRadiusGenerico);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ImageStyled = styled.img`
  width: 100px;
  height: 100px;
  border-radius: var(--bordeRadiusGenerico);
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  &:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }
`;

const BtnCerrarModalStyled = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: var(--bordeRadiusGenerico);
  cursor: pointer;
`;
export const BtnSeleccionarImg = ({
  id = "imgPerfil",
  name = "imgPerfil",
  value = "",
  onChange,
  onBlur,
  disable = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageSelect = (imageKey) => {
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: imageKey
        }
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <BtnSeleccionarImgStyled
        onClick={() => !disable && setIsModalOpen(true)}
        style={{ cursor: disable ? 'not-allowed' : 'pointer' }}
      >
        {value && DiccionarioFotoPerfil[value] ? (
          <img
            src={DiccionarioFotoPerfil[value].src}
            alt={DiccionarioFotoPerfil[value].alt}
            style={{ width: '100%', height: '100%', borderRadius: 'var(--bordeRadiusGenerico)' }}
          />
        ) : (
          '+'
        )}
      </BtnSeleccionarImgStyled>

      {isModalOpen && createPortal(
        <ModalStyled onClick={() => setIsModalOpen(false)}>
          <ModalContentStyled onClick={(e) => e.stopPropagation()}>
            {Object.keys(DiccionarioFotoPerfil).map((key) => (
              <ImageStyled
                key={key}
                src={DiccionarioFotoPerfil[key].src}
                alt={DiccionarioFotoPerfil[key].alt}
                onClick={() => handleImageSelect(key)}
              />
            ))}
          </ModalContentStyled>
        </ModalStyled>,
        document.body
      )}
    </div>
  );
};

export const TextAreaForm = ({
  id = "comentarios",
  name = "comentarios",
  placeholder = "Escribe tus comentarios aquí...",
  disable = false,
  icon = <FaUser />,
  moderno = false
}) => {
  return (
    <div>
      <ContenedorInternoField
        disable={disable}
        style={{
          padding: moderno ? 0 : undefined,
          border: moderno ? "none" : undefined,
          background: moderno ? "transparent" : undefined,
          minHeight: moderno ? "auto" : undefined,
          display: moderno ? "block" : "grid",
        }}
      >
        {!moderno && <ContenedorIconoField
          htmlFor={id}
          style={{
            alignSelf: moderno ? "stretch" : "center",
            minHeight: moderno ? "120px" : undefined,
            background: moderno
              ? "var(--colorPrincipal)"
              : undefined,
            color: moderno ? "#fff" : undefined,
            borderRight: moderno
              ? "none"
              : undefined,
          }}
        >
          {icon}
        </ContenedorIconoField>}

        <Field name={name}>
          {({ field }) => {
            const longitud = field.value?.length || 0;
            const maxCaracteres = 500;
            const restantes = maxCaracteres - longitud;


            return (
              <>

                <textarea
                  {...field}
                  id={id}
                  placeholder={placeholder}
                  disabled={disable}
                  maxLength={maxCaracteres}
                  style={{
                    height: moderno ? "180px" : "100px",
                    resize: "vertical",
                    border: "1px solid #dbe3ec",
                    width: "100%",
                    borderRadius: "var(--bordeRadiusGenerico)",
                    outline: "none",
                    backgroundColor: moderno ? "linear-gradient(145deg,#ffffff,#f5f7fa)" : "transparent",
                    color: disable ? "white" : "var(--colorPrincipal)",
                    fontSize: moderno ? "15px" : "var(--SizeNormal)",
                    lineHeight: moderno ? "1.6" : undefined,
                    padding: moderno ? "16px" : "0px",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.08)",

                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#6b7280"
                    }}
                  >
                    {restantes} caracteres restantes
                  </span>
                </div>


              </>
            );
          }}
        </Field>
      </ContenedorInternoField>

      <ErrorMessage name={name} component={ErrorMessageStyled} />
    </div >
  );
};


const CheckListItemStyled = styled.div`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const TextoCheck = styled.span`
  font-size: 16px;
  color: var(--colorPrincipal);
`;

export const CheckListItem = ({
  nombre,
  handleClick,
  activo = false,
  disabled = false,
  fullWidth = true
}) => {
  return (
    <CheckListItemStyled
      onClick={() => !disabled && handleClick()}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {activo ? (
        <FaCheckSquare size={20} color="var(--colorPrincipal)" />
      ) : (
        <FaRegSquare size={20} color="var(--colorPrincipal)" />
      )}

      <TextoCheck>{nombre}</TextoCheck>
    </CheckListItemStyled>
  );
};


export const CheckListItemFormik = ({ id, name, label, disabled = false }) => (
  <Field name={name}>
    {({ field, form }) => (
      <CheckListItem
        nombre={label}
        activo={field.value || false}
        disabled={disabled}
        handleClick={() => {
          if (!disabled) {
            form.setFieldValue(name, !field.value);
          }
        }}
      />
    )}
  </Field>
);
const BtnSeleccionarImgStyled2 = styled.div`
    width: ${({ width }) => width || "100px"};
    height: ${({ height }) => height || "100px"};

    border-radius: 50%;
    border: solid 1px var(--colorPrincipal);

    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalStyled2 = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.4);
    z-index: 9999;

    display:flex;
    justify-content:center;
    align-items:center;
`;

const ModalContentStyled2 = styled.div`
    width: 600px;
    height: 700px;

    background:white;
    border-radius:12px;
    padding: 40px;

    display:flex;
    flex-direction:column;
    gap:5px;

    overflow:hidden;
`;
const ImageStyled2 = styled.img`
    width:95%;
    height:110px;

    object-fit:cover;
    border-radius:10px;

    cursor:pointer;

    border: ${({ seleccionado }) =>
    seleccionado
      ? "3px solid var(--colorPrincipal)"
      : "3px solid transparent"};

    transition:.2s;

    &:hover{
        transform:scale(1.05);
    }
`;
const ImagenesContainerStyled = styled.div`
    display:grid;
    grid-template-columns:repeat(4, 1fr);

    column-gap:3px;
    row-gap:3px;

    justify-items:center;
    align-items:center;

    width:100%;
    flex:1;
`;
export const BtnSeleccionarImgNormal = ({
  value = "",
  onChange,
  disable = false,
  width = "100px",
  height = "100px"
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(value);


  const abrirModal = () => {
    setImagenSeleccionada(value);
    setIsModalOpen(true);
  };


  const guardarImagen = () => {
    onChange?.(imagenSeleccionada);
    setIsModalOpen(false);
  };


  return (
    <div>

      <BtnSeleccionarImgStyled2
        width={width}
        height={height}
        onClick={() => !disable && abrirModal()}
        style={{
          cursor: disable ? "not-allowed" : "pointer"
        }}
      >

        {value && DiccionarioFotoPerfilCopia[value] ? (

          <img
            src={DiccionarioFotoPerfilCopia[value].src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

        ) : (
          "+"
        )}

      </BtnSeleccionarImgStyled2>



      {isModalOpen && createPortal(

        <ModalStyled2>

          <ModalContentStyled2
            onClick={(e) => e.stopPropagation()}
          >
            <HeaderGenerico
              onRegresar={() => setIsModalOpen(false)}
              onGuardar={guardarImagen}
            />
            <ImagenesContainerStyled>

              {
                Object.keys(DiccionarioFotoPerfilCopia)
                  .map((key) => (

                    <ImageStyled2

                      key={key}

                      src={DiccionarioFotoPerfilCopia[key].src}

                      alt={DiccionarioFotoPerfilCopia[key].alt}

                      seleccionado={imagenSeleccionada === key}

                      onClick={() => {
                        setImagenSeleccionada(key)
                      }}

                    />

                  ))
              }

            </ImagenesContainerStyled>
          </ModalContentStyled2>


        </ModalStyled2>,

        document.body
      )}

    </div>
  );
};