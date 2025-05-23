/* eslint-disable react/prop-types */
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdatePlantModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const PlantDataRow = ({ refetch, plant }) => {
  const axiosSecure = useAxiosSecure()
  // delete modal state
  let [isOpen, setIsOpen] = useState(false)
  // update modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  const { image, name, category, price, quantity, _id } = plant || {}

  const handlePlantDelete = async () => {
    try {
      await axiosSecure.delete(`/plants/${_id}`)
      toast.success('Plant successfully removed.')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error(err.response.data)
    } finally {
      closeModal()
    }
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={openModal}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </span>
        {/* Delete modal */}
        <DeleteModal
          handleDelete={handlePlantDelete}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsEditModalOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>
        <UpdatePlantModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  )
}

export default PlantDataRow
