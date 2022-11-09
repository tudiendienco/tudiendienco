import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../components/constant';
import schema from '../validation';
import { useSnackbar } from 'notistack';


function UpdateDictionary({ title, open, handleClose, data, handleUpdate }) {
    const { enqueueSnackbar } = useSnackbar();
    const [word, setWord] = useState(data);

    useEffect(() => {
        setWord(data);
    }, [data]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const save = async (data) => {
        try {
            const response = await axios.post(BASE_URL, data);
            enqueueSnackbar(response.data.message, { variant: 'success' });
            // if (response.data.length) {
            //     toast.success(response.data.message)
            // } else {
            //     toast.error(response.data.message)
            // }
        } catch (error) {
            console.warn('Failed to get translator list')
            // toast.error(response.data.message)
        }
    }

    const onSubmit = (data) => {
        console.log(data);
        save(data)
        handleUpdate && handleUpdate(data)
        handleClose && handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    defaultValue={word?.originalWord}
                    id="Original"
                    label="Điển cố gốc Hán "
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register('originalWord')}
                    error={errors.originalWord ? true : false}
                    helperText={errors.originalWord?.message}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    defaultValue={word?.translateWord}
                    id="Translate"
                    label="Điển cố trong bản dịch "
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register('translateWord')}
                    error={errors.translateWord ? true : false}
                    helperText={errors.translateWord?.message}
                />
                <TextField
                    autoFocus
                    defaultValue={word?.chWord}
                    margin="dense"
                    id="Chword"
                    label="Điển cố gốc Hán "
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register('chWord')}
                    error={errors.chWord ? true : false}
                    helperText={errors.chWord?.message}
                />
                <TextField
                    multiline
                    defaultValue={word?.description}
                    rows={4}
                    autoFocus
                    margin="dense"
                    id="Description"
                    label="Giải thích điển cố"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register('description')}
                    error={errors.description ? true : false}
                    helperText={errors.description?.message}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Hủy
                </Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained">
                    Lưu lại
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateDictionary;
