import AdminSearchBar from '../../admin/AdminSearchBar';
import ProductList from '../../admin/ProductList';
import Navbar from '../Navbar';

function AdminPage() {
  return (
    <>
    <Navbar/>
    <AdminSearchBar/>
    <ProductList/>
    </>
  );
}

export default AdminPage;
