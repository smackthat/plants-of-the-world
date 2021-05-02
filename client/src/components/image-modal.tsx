import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function ImageModal({ img, setImage }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setImage(null);
        setOpen(false);
    }

    useEffect(() => {
        if (img) {
            setOpen(true);
        }
    }, [img]);

    return (

        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
            closeAfterTransition
        >
            <Fade in={open}>
                <img style={{ maxHeight: '80%', width: 'auto' }} src={img} alt=''></img>
            </Fade>

        </Modal>

    );
}