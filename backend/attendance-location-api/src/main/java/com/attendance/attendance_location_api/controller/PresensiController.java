package com.attendance.attendance_location_api.controller;

import com.attendance.attendance_location_api.service.GeoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/presensi")
@CrossOrigin("*")
public class PresensiController {

    @Autowired
    private GeoService geoService;

    @PostMapping("/locate")
    public String locate(
            @RequestBody
            Map<String, Double> payload
    ) {

        double lat = payload.get("lat");
        double lng = payload.get("lng");

        boolean inside =
                geoService.isInsideArea(
                        lat,
                        lng
                );

        if (inside) {
            return "IN AREA";
        }

        return "OUT AREA";
    }
}