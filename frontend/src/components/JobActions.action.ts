import {AllJobsResponseModel, JobCreationResponseModel, TransformedAddEditJobProps} from "../models/componentsTypes.ts";
import {jobInstance} from "../api/axiosInstances.ts";

export class JobActions {

	static postNewJob = async (
		data: TransformedAddEditJobProps
	): Promise<JobCreationResponseModel> => {
		const response = await jobInstance.post<JobCreationResponseModel>("/new", data);
		return response.data;
	}

	static getAllJobs = async (
		userId: string,
	): Promise<AllJobsResponseModel[]> => {
		const response = await jobInstance.get<AllJobsResponseModel[]>(`/all/${userId}`);
		return response.data;
	}
}