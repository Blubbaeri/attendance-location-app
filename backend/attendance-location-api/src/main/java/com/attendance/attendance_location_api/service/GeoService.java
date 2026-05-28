package com.attendance.attendance_location_api.service;

import org.springframework.stereotype.Service;

@Service
public class GeoService {

        /*
         * FORMAT:
         * {
         * latitude,
         * longitude,
         * radius (meter)
         * }
         */
        private static final double[][] AREAS = {

                        // Lokasi 1
                        {
                                        -6.347963874313896,
                                        107.14841576927931,
                                        100
                        },

                        // Lokasi 2
                        {
                                        -6.325400872846648,
                                        107.14424274663129,
                                        100
                        },

                        // Lokasi 3
                        {
                                        -6.351180025796279,
                                        107.19503011535203,
                                        150
                        }

        };

        public boolean isInsideArea(
                        double lat,
                        double lng) {

                // cek semua area
                for (double[] area : AREAS) {

                        double centerLat = area[0];

                        double centerLng = area[1];

                        double radius = area[2];

                        double distance = calculateDistance(
                                        lat,
                                        lng,
                                        centerLat,
                                        centerLng);

                        // kalau masuk salah satu area
                        if (distance <= radius) {
                                return true;
                        }
                }

                // kalau ga masuk area mana pun
                return false;
        }

        private double calculateDistance(
                        double lat1,
                        double lon1,
                        double lat2,
                        double lon2) {

                final int EARTH_RADIUS = 6371000;

                double latDistance = Math.toRadians(
                                lat2 - lat1);

                double lonDistance = Math.toRadians(
                                lon2 - lon1);

                double a = Math.sin(
                                latDistance / 2)
                                *
                                Math.sin(
                                                latDistance / 2)
                                +
                                Math.cos(
                                                Math.toRadians(
                                                                lat1))
                                                *
                                                Math.cos(
                                                                Math.toRadians(
                                                                                lat2))
                                                *
                                                Math.sin(
                                                                lonDistance / 2)
                                                *
                                                Math.sin(
                                                                lonDistance / 2);

                double c = 2 *
                                Math.atan2(
                                                Math.sqrt(a),
                                                Math.sqrt(1 - a));

                return EARTH_RADIUS * c;
        }
}