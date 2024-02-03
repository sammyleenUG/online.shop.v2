import SweetAl from "sweetalert2";
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {


        };
    },
    methods: {
       showLoading(){
           return SweetAl.fire({
               title: 'Please wait...',
               allowEscapeKey: false,
               allowOutsideClick: false,
               didOpen: () => {
                   SweetAl.showLoading();
               },
           });
       },

       showWarningMessage(message){
           return SweetAl.fire({
               title: 'Confirmation',
               html: message,
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'Yes,proceed',
               confirmButtonColor: "#f00",
               cancelButtonText: 'Cancel'
           });
       },

        showSuccessMessage2(message){
            return SweetAl.fire({
                title: 'Hooray',
                html: message,
                icon: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonText: 'OK,Continue shopping',
                confirmButtonColor: "#f00",
            });
        },


        showErrorMessage(message){
            const toast = useToast();

            // Show a toast notification
            toast.error(message);
        },


        showSuccessMessage(message){
            const toast = useToast();

            // Show a toast notification
            toast.success(message);
        }


    },
};
