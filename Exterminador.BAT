COLOR 1f
MODE 63,20
@echo off
CLS
ECHO.
ECHO.
ECHO.
ECHO		DEIXA QUE EU FECHO O SISTEMA PARA VOCE!
ECHO.
ECHO.
ECHO.

taskkill /F /IM DJIntegracao.EXE
taskkill /F /IM DJMonitor.EXE
taskkill /F /IM DJPDV.EXE
taskkill /F /IM DJPDVMonUpdater.exe

XCOPY C:\Apoio\DLL_Sitef\ C:\TesteAutomatizado\PDV\ /D /E /Y /C /K
XCOPY C:\Apoio\DLL_Sitef\ C:\TesteAutomatizadoMEI\PDV\ /D /E /Y /C /K



