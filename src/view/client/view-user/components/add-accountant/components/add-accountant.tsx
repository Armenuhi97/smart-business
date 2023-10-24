// import React from 'react';
// import { Button, Form } from 'react-bootstrap';
// import Title from '../../../../../../components/title/title';
// import PopupHook from '../../../../../../utils/hooks/popup.hook';


// function AddAccountantForClient() {
//     const {
//         form,
//         setForm,
//         errors,
//         setErrors,
//         dispatch,
//         setField,
//         handleClose
//     } = PopupHook<{ accountant: string }>({
//         accountant: ''
//     });

//     const {
//         handleSubmit,
//         resetForm,
//         id,
//         user
//     } = UserPersonalProps(setForm, form, dispatch, setErrors);


//     return (
//         <div>
//             {!id && <Title title='Կցել հաշվապահ' isShowAdd={false} />}
//             <Form className='mt-4' onSubmit={handleSubmit}>
//                 <Form.Group >
//                     <div className='row'>
//                         <div className='col'>
//                             <Form.Label>Անուն</Form.Label>
//                             <Form.Control
//                                 type='text'
//                                 value={form.accountant || ''}
//                                 onChange={e => setField('accountant', e.target.value)}
//                                 isInvalid={!!errors?.accountant}
//                             />
//                             <Form.Control.Feedback type='invalid'>
//                                 {errors?.accountant}
//                             </Form.Control.Feedback>
//                         </div>

//                     </div>
//                 </Form.Group>
//                 <div className='mt-3 justify-content-center d-flex'><Button onClick={handleSubmit}>Պահպանել</Button></div>
//             </Form>
//         </div>
//     )
// }
// export default AddEditClient;