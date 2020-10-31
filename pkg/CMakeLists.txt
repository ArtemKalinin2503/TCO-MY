cmake_minimum_required(VERSION 2.8)

project(tco32-front)

option(BUILDER "BUILDER" OFF)
option(BUILD_DEBUG "BUILD_DEBUG" OFF)
option(BUILD_TESTING "BUILD_TESTING" OFF)
option(BUILD_RPM "BUILD_RPM" OFF)

if(BUILD_TESTING)
    enable_testing()
endif()

message("BUILD CONFIGURATION:\n"
    "BUILDER:	${BUILDER}\n"
    "BUILD_DEBUG:	${BUILD_DEBUG}\n"
    "BUILD_TESTING:	${BUILD_TESTING}\n"
    "BUILD_RPM:	${BUILD_RPM}\n"
)

set_property(GLOBAL PROPERTY FIND_LIBRARY_USE_LIB64_PATHS ON)

message("Constructing Makefiles for ${PROJECT_NAME} ver ")

SET(CMAKE_INSTALL_PREFIX /)

INSTALL(DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/../build/
    #DESTINATION usr/share/tco32-front/www/
    DESTINATION usr/posrest/app/
    USE_SOURCE_PERMISSIONS
    )

set(CPACK_SET_DESTDIR ON)
set(CPACK_PACKAGE_NAME ${PROJECT_NAME})
set(CPACK_PACKAGE_VENDOR "Expertek IBS")
set(CPACK_PACKAGE_CONTACT "http://expertek.ru")
set(CPACK_PACKAGE_VERSION $ENV{VERSION_NUMBER})
set(PACKAGE_RELEASE 1)
set(CPACK_PACKAGE_DESCRIPTION "TCO 32 react-js frontend")

if(BUILD_RPM)
    INSTALL(FILES ${CMAKE_CURRENT_SOURCE_DIR}/centos/xinitrc.d/03-tco32-front.sh
        DESTINATION etc/X11/xinit/xinitrc.d/
        PERMISSIONS OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE
    )

    INSTALL(FILES ${CMAKE_CURRENT_SOURCE_DIR}/centos/gdm/custom.conf.dist
        DESTINATION usr/share/tco32-front
        PERMISSIONS OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE
    )
    set(CPACK_GENERATOR "RPM")
    set(CPACK_RPM_EXCLUDE_FROM_AUTO_FILELIST
        "/etc"
        "/etc/init.d"
        "/usr"
        "/usr/bin"
        "/usr/include"
        "/usr/lib"
#        "${CPACK_RPM_EXCLUDE_FROM_AUTO_FILELIST}"
        "/etc/sudoers.d"
        "/etc/X11"
        "/etc/X11/xorg.conf.d"
        "/etc/X11/xinit"
        "/etc/X11/xinit/xinitrc.d"
        "/usr/share"
    )
    set(CPACK_RPM_POST_INSTALL_SCRIPT_FILE "${CMAKE_CURRENT_SOURCE_DIR}/postinst")
    set(CPACK_RPM_POST_UNINSTALL_SCRIPT_FILE "${CMAKE_CURRENT_SOURCE_DIR}/postrm")
    set(CPACK_RPM_PACKAGE_REQUIRES "coreutils findutils sed bash systemd xterm chromium posrest")
else()
    INSTALL(DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/astra
        DESTINATION usr/share/tco32-front
        USE_SOURCE_PERMISSIONS
    )
    set(CPACK_GENERATOR "DEB")
    set(CPACK_DEBIAN_PACKAGE_CONTROL_EXTRA
        "${CMAKE_CURRENT_SOURCE_DIR}/postrm"
        "${CMAKE_CURRENT_SOURCE_DIR}/postinst"
        "${CMAKE_CURRENT_SOURCE_DIR}/conffiles"
    )
    set(CPACK_DEBIAN_PACKAGE_SECTION "misc")
    set(CPACK_DEBIAN_PACKAGE_DEPENDS "bash, sed, klibc-utils, systemd, coreutils, findutils, xterm, chromium, posrest")
endif()

include(CPack)
