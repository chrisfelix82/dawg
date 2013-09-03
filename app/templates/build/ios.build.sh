#!/bin/sh
cd ${1}/${2}/native
xcodebuild -configuration Distribution clean build
xcrun -sdk iphoneos PackageApplication -v "./build/Distribution-iphoneos/${5}.app" -o "${4}.ipa" -verbose