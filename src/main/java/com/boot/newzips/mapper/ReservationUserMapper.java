package com.boot.newzips.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.boot.newzips.dto.RealtorDTO;
import com.boot.newzips.dto.ReservationStatusDTO;
import com.boot.newzips.dto.RoomInfoDTO;
import com.boot.newzips.dto.VisitorReservDTO;

@Mapper
public interface ReservationUserMapper {

	public void insertReservation(VisitorReservDTO dto) throws Exception;

	public String selectAvailableDate(Map<String, Object> map) throws Exception;

	public String selectAvailableTime(Map<String, Object> map) throws Exception;

	public VisitorReservDTO selectReservationReservNo(String reservNo) throws Exception;

	// �������̵�� ��ȸ
	public List<VisitorReservDTO> selectReservationUserId(String userId) throws Exception;

	public VisitorReservDTO selectReservationItemId(String itemId) throws Exception;

	public RoomInfoDTO getReservationRoomInfo(String itemId) throws Exception;

	public RealtorDTO getRealtorInfo(String realtorId) throws Exception;

	public void deleteReservation(String reservNo) throws Exception;

	public List<RealtorDTO> getRealtorInfoByRealtorId() throws Exception;

	public List<ReservationStatusDTO> getReservationList(String userId) throws Exception;
}
