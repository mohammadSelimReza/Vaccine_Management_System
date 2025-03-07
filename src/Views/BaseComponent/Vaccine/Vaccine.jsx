import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useUserProfile from "../../../plugin/UserProfile";
import publicApiInstance from "../../../Utils/publicApiInstance";
import authApiInstance from "../../../Utils/authApiInstance";
import BaseHeader from "../../PartialComponent/BaseHeader";
import Toast from "../../../plugin/useToast";
import BaseFooter from "../../PartialComponent/BaseFooter";

const Vaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("None");
  const [sort,setSort] = useState("None")
  const { setLoading, loading, doctor, patient } = useUserProfile();
  const [pageCount,setPageCount] = useState(1);
  const [page,setPage] = useState(1);
  const fetchVaccineData = async () => {
    setLoading(true);
    try {
      await publicApiInstance
        .get(`/vaccine/list/?page=${page}&type=${filter}&ordering=${sort}`)
        .then((response) => {
          setVaccines(response.data.results);
          setPageCount(Math.ceil(response.data.count/6));
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the vaccine data!", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("There was an error fetching the vaccine data!", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchVaccineData();
  }, [page]);
  const resetfilet = async () => {
    console.log(filter);
    setLoading(true);
    setFilter("None");
    setSort("None");
    setPage(1);
    try {
      await publicApiInstance
        .get(`/vaccine/list/`)
        .then((response) => {
          setVaccines(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the vaccine data!", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("There was an error fetching the vaccine data!", error);
      setLoading(false);
    }
  }
  const handleSortChange = (e) => {
    setSort(e.target.value); 
  };
  const navigate = useNavigate();
  const viewDetail = (id) => {
    navigate(`/vaccine/detail/${id}`)
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="relative z-50">
          <BaseHeader />
        </div>

        {/* Main Content - Takes remaining space */}
        <div className="flex-grow flex">
          <div className="md:max-w-7xl mx-auto my-10 px-4">
            <h1 className="text-3xl text-center font-bold mb-8">Vaccines We Provide</h1>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <aside className="w-full md:w-56 p-4 bg-base-100 shadow-xl rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Filter:</h3>
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="radio"
                    name="ageFilter"
                    className="radio radio-primary"
                    checked={filter === "adult"}
                    onChange={() => setFilter("adult")}
                  />
                  <span>Adult</span>
                </label>
                <label className="flex items-center gap-2 mb-6">
                  <input
                    type="radio"
                    name="ageFilter"
                    className="radio radio-primary"
                    checked={filter === "child"}
                    onChange={() => setFilter("child")}
                  />
                  <span>Child</span>
                </label>
                <h3 className="text-lg font-semibold mb-4">Sort:</h3>
                <select 
                  className="select select-bordered mb-6"
                  value={sort} 
                  onChange={handleSortChange}
                >
                  <option value="#">Select Option</option>
                  <option value="vaccine_name">Name</option>
                  <option value="expiration_date">Date</option>
                </select>
                <button onClick={() => fetchVaccineData()} className="btn btn-primary w-full mb-4">
                  Apply
                </button>
                <button onClick={() => resetfilet()} className="btn btn-outline-red w-full">
                  Reset
                </button>
              </aside>

              <div className="lg:w-[900px]">
              <div className="flex justify-end items-center my-10">
                  <h6 className="font-semibold text-2xl mr-4">Page:</h6>
                  <div className="join">
                    {Array.from({ length: pageCount }, (_, index) => (
                      <input
                        key={index + 1}
                        className="join-item btn btn-square"
                        type="radio"
                        name="options"
                        aria-label={index + 1}
                        checked={page === index + 1}
                        onChange={() => setPage(index + 1)}
                      />
                    ))}
                  </div>
                </div>
                {/* Loading Spinner */}
                {loading && (
                  <div className="flex justify-center w-full">
                    <span className="loading loading-spinner text-info"></span>
                  </div>
                )}
                {!loading && error && <p className="text-center text-red-500">{`Error: ${error}`}</p>}
                {vaccines.length === 0 && (
                  <p className="text-center text-gray-500 w-full">No vaccines have been added yet.</p>
                )}
                {!loading && (
                  <ul className="flex flex-wrap justify-center gap-4">
                    {vaccines.map((vaccine) => (
                      <div key={vaccine.id} className="w-full sm:w-72">
                        <div className="card bg-base-100 shadow-xl">
                          <button onClick={() => viewDetail(vaccine.id)}>
                            <figure className="px-4 pt-4 ">
                              <img
                                src={vaccine.vaccine_img}
                                alt="vaccine_img"
                                className="rounded-xl h-52 w-full object-cover "
                              />
                            </figure>
                          </button>
                          <div className="card-body items-start text-start ">
                            <h2 className="card-title font-bold text-lg h-12 flex justify-start items-start" > {vaccine?.vaccine_name} </h2>
                            <p className="text-gray-600 font-semibold">{vaccine?.manufacturer}</p>
                            <p className="text-gray-500" dangerouslySetInnerHTML={{__html: `${vaccine?.description?.slice(0,25)}...`}} ></p>
                            <a href="#" className="text-blue-600" onClick={() => viewDetail(vaccine.id)}>Read More...</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                )}
                
              </div>
            </div>
          </div>
        </div>


        {/* Footer at Bottom */}
        <BaseFooter />
      </div>
    </>
  );
};

export default Vaccine;
