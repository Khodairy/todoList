import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { TodosContext } from "../UseContext/todoContext";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function TodoInfo(props) {
  const { todos, setTodos } = useContext(TodosContext);

  // ==== Done Button =====

  function handlerDoneBtn() {
    const updateTodos = todos.map((t) => {
      if (t.id === props.todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setTodos(updateTodos);
    if (props.todo.isCompleted) {
      // playSound(); // Play sound when done button is clicked
    } else if (!props.todo.isCompleted) {
      // playFalseSound();
    }
  }

  // ==== Delete Dialog =====

  const [open, setOpen] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpen(false);
  };

  function handleDeleteConfirm() {
    const updateTodos = todos.filter((t) => {
      return t.id !== props.todo.id;
    });
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setTodos(updateTodos);
    setOpen(false);
  }

  // ==== Edit Dialog =====

  const [openE, setOpenE] = useState(false);
  const [updateDailog, setUpdateDailog] = useState({
    title: props.todo.title,
    details: props.todo.details,
  });

  const handleOpenEditDialog = () => {
    setOpenE(true);
  };

  const handleSubmit = () => {
    const updateTodos = todos.map((t) => {
      if (t.id === props.todo.id) {
        return {
          ...t,
          title: updateDailog.title,
          details: updateDailog.details,
        };
      }
      return t;
    });
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setTodos(updateTodos);
    setOpenE(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من رغبتك في حذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامة
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>اغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openE}
        onClose={() => {
          setOpenE(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={updateDailog.title}
            onChange={(event) => {
              setUpdateDailog({ ...updateDailog, title: event.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={updateDailog.details}
            onChange={(event) => {
              setUpdateDailog({ ...updateDailog, details: event.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenE(false);
            }}
          >
            اغلاق
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        className="card"
        sx={{ minWidth: 275 }}
        style={{
          backgroundColor: "#283593",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={8} style={{ color: "white", textAlign: "right" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{
                    textDecoration: props.todo.isCompleted
                      ? "line-through"
                      : "none",
                  }}
                >
                  {props.todo.title}
                </Typography>
                <Typography variant="body1" component="div">
                  {props.todo.details}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    className="iconButton"
                    aria-label="mark as done"
                    size="large"
                    style={{
                      marginLeft: "10px",
                      color: props.todo.isCompleted ? "white" : "#8bc34a",
                      border: "1px solid #8bc34a",
                      backgroundColor: props.todo.isCompleted
                        ? "#8bc34a"
                        : "white",
                    }}
                    onClick={handlerDoneBtn}
                  >
                    <DoneOutlinedIcon />
                  </IconButton>
                  <IconButton
                    className="iconButton"
                    aria-label="edit"
                    size="large"
                    style={{
                      marginLeft: "10px",
                      color: "#1769aa",
                      border: "1px solid #1769aa",
                      backgroundColor: "white",
                    }}
                    onClick={handleOpenEditDialog}
                  >
                    <CreateOutlinedIcon />
                  </IconButton>
                  <IconButton
                    className="iconButton"
                    aria-label="delete"
                    size="large"
                    style={{
                      marginLeft: "10px",
                      color: "#b23c17",
                      border: "1px solid #b23c17",
                      backgroundColor: "white",
                    }}
                    onClick={handleOpenDeleteDialog}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
