import { useEffect, useState } from 'react';
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import { Table } from "flowbite-react";
import axios from 'axios';

function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [editId, setEditId] = useState(null); // 🆕

  useEffect(() => {
    getAllEnquiries();
  }, []);

  const getAllEnquiries = () => {
    axios.post('http://localhost:8020/api/enquiry/view')
      .then((res) => {
        if (res.data.status) {
          setEnquiryList(res.data.enquiryList);
        }
      });
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEnquiry = (e) => {
    e.preventDefault();
    const payload = {
      sName: formData.name,
      sEmail: formData.email,
      sPhone: formData.phone,
      sMessage: formData.message
    };

    if (editId) {
      axios.put(`http://localhost:8020/api/enquiry/update/${editId}`, payload)
        .then(res => {
          toast.success('Enquiry Updated');
          resetForm();
          getAllEnquiries();
        });
    } else {
      axios.post(`http://localhost:8020/api/enquiry/insert`, payload)
        .then((res) => {
          toast.success('Enquiry Saved');
          resetForm();
          getAllEnquiries();
        });
    }
  };

  const editEnquiry = (id) => {
    axios.get(`http://localhost:8020/api/enquiry/edit/${id}`)
      .then((res) => {
        if (res.data.status === 1) {
          const item = res.data.enquiry;
          setFormData({
            name: item.name,
            email: item.email,
            phone: item.phone,
            message: item.message
          });
          setEditId(item._id);
        } else {
          toast.error("Enquiry not found");
        }
      })
      .catch((err) => {
        console.error("Edit error:", err);
        toast.error("Failed to load enquiry for editing");
      });
  };

  const deleteEnquiry = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`http://localhost:8020/api/enquiry/delete/${id}`)
        .then(res => {
          toast.success("Deleted");
          getAllEnquiries();
        });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setEditId(null); 
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>

      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">{editId ? "Edit" : "New"} Enquiry</h2>
          <form onSubmit={saveEnquiry}>
            <div className='py-3'>
              <Label htmlFor="name" value="Your Name:" />
              <TextInput type="text" value={formData.name} onChange={getValue} name='name' required />
            </div>
            <div className='py-3'>
              <Label htmlFor="email" value="Your Email:" />
              <TextInput type="email" value={formData.email} onChange={getValue} name='email' required />
            </div>
            <div className='py-3'>
              <Label htmlFor="phone" value="Your Phone:" />
              <TextInput type="text" value={formData.phone} onChange={getValue} name='phone' required />
            </div>
            <div className='py-3'>
              <Label htmlFor="message" value="Your Message:" />
              <Textarea rows={4} value={formData.message} onChange={getValue} name='message' required />
            </div>
            <div className='py-3 flex gap-2'>
              <Button type="submit">{editId ? "Update" : "Save"}</Button>
              {editId && <Button color="gray" onClick={resetForm}>Cancel</Button>}
            </div>
          </form>
        </div>

        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">Enquiry List</h2>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Sr No.</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Message</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {enquiryList.map((item, index) => (
                  <Table.Row key={item._id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>{item.message}</Table.Cell>
                    <Table.Cell>
                      <Button size="xs" color="failure" onClick={() => deleteEnquiry(item._id)}>Delete</Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button size="xs" color="info" onClick={() => editEnquiry(item._id)}>Edit</Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
