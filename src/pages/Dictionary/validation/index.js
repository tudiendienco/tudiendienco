import yup from '../../../utils/yupValidation';

const schema = yup.object().shape({
    originalWord: yup.string().required('Vui lòng điền vào trường này.').trim(),
    description: yup.string().required('Vui lòng điền vào trường này.').trim(),
    chWord: yup.string().required('Vui lòng điền vào trường này.').trim(),
    translateWord: yup.string().required('Vui lòng điền vào trường này.').trim(),
});
export default schema;
