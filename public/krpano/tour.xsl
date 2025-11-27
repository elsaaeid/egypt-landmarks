<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>krpano tour.xml</title>
        <style>
          body{font-family:system-ui,Segoe UI,Roboto,Arial; padding:20px}
          h1{font-size:20px}
          ul{line-height:1.6}
          pre{background:#f6f8fa;padding:12px;border-radius:6px;overflow:auto}
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="/krpano/@title"/></h1>
        <p>Version: <xsl:value-of select="/krpano/@version"/></p>
        <h2>Scenes</h2>
        <ul>
          <xsl:for-each select="/krpano/scene">
            <li><strong><xsl:value-of select="@name"/></strong>
              <xsl:if test="@title"> — <xsl:value-of select="@title"/></xsl:if>
            </li>
          </xsl:for-each>
        </ul>
        <h2>Raw XML</h2>
        <pre><xsl:copy-of select="."/></pre>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
